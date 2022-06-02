import functionGetUsers from '../../routers/admin/functions/get';

export = (router: any) => {
  // Fetch all users
  router.get('/get_all_users', async (req: any, res: any) => {
    await functionGetUsers.getAllUserRouter(req, res);
  });

  router.get('/get_user_by_id/:id', async (req: any, res: any) => {
    await functionGetUsers.getUserIdRouter(req, res);
  });

};
