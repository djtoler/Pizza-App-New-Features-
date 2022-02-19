module.exports = {
    ensureAuthenticated: function(req:any, res:any, next:any) {
      if (req.isAuthenticated()) {
          console.log("is authenticated");
          
        return next();
      }
      console.log(req.body);
      console.log("is not authenticated");
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req:any, res:any, next:any) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dbwelcome');      
    }
  };

//   module.exports = {
//     ensureAuthenticated: function(req: { isAuthenticated: () => any; flash: (arg0: string, arg1: string) => void; }, res: { redirect: (arg0: string) => void; }, next: () => any) {
//       if (req.isAuthenticated()) {
//           console.log("Ensure Authenticated");
          
//         return next();
//       }
//       console.log("not authenticated");
      
//       req.flash('error_msg', 'Please log in to view that resource');
//       res.redirect('/login');
//     },
//     forwardAuthenticated: function(req: { isAuthenticated: () => any; }, res: { redirect: (arg0: string) => void; }, next: () => any) {
//       if (!req.isAuthenticated()) {
//         return next();
//       }
//       console.log("Forward Authenticated");
//       res.redirect('/dbwelcome');      
//     }
//   };