// https://github.com/google/google-api-nodejs-client/issues/848
import { createNotificationKey, retrieveNotificationKey, addToken, removeToken } from '../userGroups';


const MOCK_SUCCESS_USER_ID = 'mock_success_user_id';
const MOCK_FAILURE_USER_ID = 'mock_failure_user_id';

const mockData: TokenRecord = {
  type: 'web',
  lang: 'en',
  token: '123456',
  userId: '123456'
};

jest.mock('../userGroups', () => {
  const originalModule = require.requireActual('../userGroups');
  const mockModule = jest.genMockFromModule('../userGroups');

  // Mock the name export
  return Object.assign({}, mockModule, originalModule, {
    createNotificationKey: jest.fn(
      (record: TokenRecord) => {
        return new Promise((resolve, reject) => {
          resolve('test string');
        });
      }
    ),
    retrieveNotificationKey: jest.fn(
      (record: TokenRecord) => {
        return new Promise((resolve, reject) => {
          resolve('test string');
        });
      }
    ),
    addToken: jest.fn(
      (record: TokenRecord) => {
        return new Promise((resolve, reject) => {
          resolve('test string');
        });
      }
    ),
    removeToken: jest.fn(
      (record: TokenRecord) => {
        return new Promise((resolve, reject) => {
          resolve('test string');
        });
      }
    )
  });
});

const mockRecord: TokenRecord = {
  type: 'web',
  lang: 'en',
  token: '123456',
  userId: '123456'
};

describe('userGroups', () => {
  it('should create notification key', async (done) => {
    try {
      const result = await createNotificationKey(mockRecord);
      expect(typeof result).toBe('string');
    } catch(err) {
      expect(err).toBeUndefined();
    }
    done();
  });

  it('should retrieve notification key', async (done) => {
    try {
      const result = await retrieveNotificationKey(mockRecord);
      expect(typeof result).toBe('string');
    } catch(err) {
      expect(err).toBeUndefined();
    }
    done();
  });

  it('should add token', async (done) => {
    try {
      const result = await addToken(mockRecord);
      expect(typeof result).toBe('string');
    } catch(err) {
      expect(err).toBeUndefined();
    }
    done();
  });

  it('should remove token', async (done) => {
    try {
      const result = await removeToken(mockRecord);
      expect(typeof result).toBe('string');
    } catch(err) {
      expect(err).toBeUndefined();
    }
    done();
  });
});
