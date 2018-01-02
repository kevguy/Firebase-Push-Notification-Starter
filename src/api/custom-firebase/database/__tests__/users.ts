// https://github.com/google/google-api-nodejs-client/issues/848
import { retrieveUser, updateUser, deleteUser } from '../users';

const MOCK_SUCCESS_USER_ID = 'mock_success_user_id';
const MOCK_FAILURE_USER_ID = 'mock_failure_user_id';

const mockData: TokenRecord = {
  type: 'web',
  lang: 'en',
  token: '123456',
  userId: '123456'
};

jest.mock('../users', () => {
  const originalModule = require.requireActual('../users');
  const mockModule = jest.genMockFromModule('../users');
  const MOCK_SUCCESS_USER_ID = 'mock_success_user_id';
  const MOCK_FAILURE_USER_ID = 'mock_failure_user_id';

  // Mock the name export
  return Object.assign({}, mockModule, originalModule, {
    retrieveUser: jest.fn(
      (database: any, userId: string) => {
        return new Promise((resolve, reject) => {
          if (userId === MOCK_SUCCESS_USER_ID) {
            resolve({
              'token_1_key': 'token_1_val',
              'token_2_key': 'token_2_val',
              'token_3_key': 'token_3_val',
              'token_4_key': 'token_4_val'
            });
          } else {
            reject({});
          }
        });
      }
    ),
    updateUser: jest.fn(
      (database: any, record: TokenRecord) => {
        return new Promise((resolve, reject) => {
          resolve(undefined);
        });
      }
    ),
    deleteUser: jest.fn(
      (database: any, userId: string) => {
        return new Promise((resolve, reject) => {
          if (userId === MOCK_SUCCESS_USER_ID) {
            resolve(undefined);
          } else {
            reject({
              code: 'code',
              message: 'message'
            });
          }
        });
      }
    )
  });
});

describe('users', () => {
  it('should retrieve user', async (done) => {
    let result: any;
    try {
      result = await retrieveUser(undefined, MOCK_SUCCESS_USER_ID);
      expect(result).toHaveProperty('token_1_key');
    } catch(err) {
      expect(err).toMatchObject({});
    }

    try {
      result = await retrieveUser(undefined, MOCK_FAILURE_USER_ID);
    } catch(err) {
      expect(err).toMatchObject({});
    }
    done();
  });

  it('should update user', async (done) => {
    const result = await updateUser(undefined, mockData);
    expect(result).toBeUndefined();
    done();
  });

  it('should delete user', async (done) => {
    let result: any;
    try {
      result = await deleteUser(undefined, MOCK_SUCCESS_USER_ID);
      expect(result).toBeUndefined();
    } catch(err) {
      expect(result).toHaveProperty('code');
      expect(result).toHaveProperty('message');
    }

    try {
      result = await deleteUser(undefined, MOCK_FAILURE_USER_ID);
    } catch(err) {
      expect(err).toHaveProperty('code');
      expect(err).toHaveProperty('message');
    }
    done();
  });
});
