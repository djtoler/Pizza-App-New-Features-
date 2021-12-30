// module.exports = {
//     ensureAuthenticated: function(req: { isAuthenticated: () => any; flash: (arg0: string, arg1: string) => void; }, res: { redirect: (arg0: string) => void; }, next: () => any) {
//       if (req.isAuthenticated()) {
//         return next();
//       }
//       req.flash('error_msg', 'Please log in to view that resource');
//       res.redirect('/dbusers/login');
//     },
//     forwardAuthenticated: function(req: { isAuthenticated: () => any; }, res: { redirect: (arg0: string) => void; }, next: () => any) {
//       if (!req.isAuthenticated()) {
//         return next();
//       }
//       res.redirect('/dbdashboard');      
//     }
//   };