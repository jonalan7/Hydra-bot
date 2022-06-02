import functionPutUsers from '../../routers/admin/functions/put';

export = (router: any) => {
  router.put('/change_password', async (req: any, res: any) => {
    await functionPutUsers.changePasswordRouter(req, res);
  });

  router.put('/change_name', async (req: any, res: any) => {
    await functionPutUsers.changeNameRouter(req, res);
  });

  router.put('/deactivate_user', async (req: any, res: any) => {
    await functionPutUsers.deactivateUserRouter(req, res);
  });

  router.put('/activate_user', async (req: any, res: any) => {
    await functionPutUsers.activateUserRouter(req, res);
  });
};
