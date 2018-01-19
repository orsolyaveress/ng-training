import { LoginPage } from './login.po';

describe('ng-training Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should log me in', async () => {
    page.navigateTo();
    await page.login();
    expect(page.getNavbarUserName()).toBe('Test User');
  });
});
