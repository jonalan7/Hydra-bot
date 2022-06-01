import functionPostUsers from '../../routers/admin/functions/post';

export = (router: any) => {
  // Create user
  router.post('/create_user', async (req: any, res: any) => {
    await functionPostUsers.createUserRouter(req, res);
  });
};