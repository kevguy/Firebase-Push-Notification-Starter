// https://github.com/google/google-api-nodejs-client/issues/848
import defaultExport, { saveUserStream, createNotificationKeyStream } from '../save-token';
import { Observable } from 'rxjs/Rx';

jest.mock('../save-token', () => {
  const Rx = require('rxjs/rx');

  const originalModule = require.requireActual('../save-token');
  const mockModule = jest.genMockFromModule('../save-token');

  // Mock the name export
  return Object.assign({}, mockModule, originalModule, {
    saveUserStream: jest.fn(
      (database: any, record: TokenRecord) => {
        return Rx.Observable.of({
          status: 'success',
          msg: 'saved user successfully'
        });
      }
    ),
    createNotificationKeyStream: jest.fn(
      (record: TokenRecord) => {
        return Rx.Observable.of({
          status: 'success',
          msg: 'created notification key successfully',
          notification_key: 'DUMMY_VAL'
        });
      }
    )
  });
});

const mockDatabase: any = '';

const mockData: any = {
  userId: '-420',
  token: '000000',
  lang: 'en',
  type: 'web'
};

describe('save-token', () => {
  it('should save web token', (done) => {
    const payload: any = {
      status: 'success',
      result: []
    };

    const userStream = saveUserStream(mockDatabase, mockData);
    const notificationKeyStream = createNotificationKeyStream(mockData);
    const stream = Observable.merge(userStream, notificationKeyStream);

    stream.subscribe(
      (result: {}) => {
        expect(result).toHaveProperty('status', 'success');
        payload.result.push(result);
      },
      (err: Error) => {
        payload.status = 'failure';
        payload.result.push({ status: 'failure', result: err });
      },
      () => {
        expect(saveUserStream).toHaveBeenCalledTimes(1);
        expect(createNotificationKeyStream).toHaveBeenCalledTimes(1);
        expect(payload).toHaveProperty('status');
        expect(payload).toHaveProperty('result');
        expect(payload.result.length).toEqual(2);
        done();
      }
    );
  });
});
