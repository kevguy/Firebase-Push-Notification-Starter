const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const session = require('express-session')
const mongo = require('connect-mongo')
const mongoose = require('mongoose')

require('isomorphic-fetch')

const apiRoutes = require('./dist/api-bundle.js').default



const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`


const MongoStore = mongo(session)


/**
 * Load environment variables from .env file file, where stuff like API keys
 * and passwords and whatnot are configured
 */
dotenv.config({ path: '.env' })

const app = express()

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
})


function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(cookieParser())
app.use(compression({ threshold: 0 }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
})
app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'linkinpark',
  store: new MongoStore({
    url: process.env.MONGOLAB_URI || process.env.MONGODB_URI,
    autoReconnect: true
  })
}));

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

function render (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Ice Ice Baby', // default title
    url: req.url,
    cookies: req.cookies
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}


app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.cookies);
  next();
})

// for handling API routes
// example: baseUrl/API/...
apiRoutes(app);

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
  // fetch('https://android.googleapis.com/gcm/notification', {
  //   method: 'POST',
  //   headers: new Headers({
  //     'Content-Type': 'application/json',
  //     'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
  //     'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
  //   }),
  //   body: JSON.stringify({
  //     'operation': 'create',
  //     'notification_key_name': 'fuck_fuck',
  //     'registration_ids': [ 'dpHcSyezRto:APA91bEJN2oVBSC69aEAiPeHBSHpMqc3bNN7UL6HfWueT6SEC-PIy67A4MfkiKeG0KfEZLaDpK4QfNZ8tncaoNYptHkiD5fu5jE6G2fUqw5rDVKoJKK9pa-ZBuQ2vcVNf-iNlhD-SOyR' ]
  //   })
  // })
  // .then((res) => res.json())
  // .catch((err) => {
  //   console.error(`userGroups: failed to create notification key: ${err}`);
  // })
  // .then((res) => console.log(res));;
})
