import functionDeleteUsers from '../../routers/admin/functions/delete';

export = (router: any) => {
  router.delete('/delete_user/:id', async (req: any, res: any) => {
    await functionDeleteUsers.deleteUserRouter(req, res);
  });
};
