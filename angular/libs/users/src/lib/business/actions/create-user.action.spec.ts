import { CreateUserAction } from './create-user.action';

describe('CreateUserAction', () => {
  it('should create an instance', () => {
    const userId = '1';
    expect(new CreateUserAction(userId)).toBeTruthy();
  });
});
