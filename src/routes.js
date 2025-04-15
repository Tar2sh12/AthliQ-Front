// import {  createBrowserRouter } from "react-router-dom";
// import App from './App';
// import { AuthGuard } from "./guards/auth-guard";
// export const routes = createBrowserRouter([
//     {
//       path: "", //localhost:3000
//       element: <App />,
//       children: [
//         {
//           path: "",
//           element: <Login />,
//         },
//         {
//           // Guard
//           element: <AuthGuard roles={[]} />,
//           children: [
//             {
//               path: "/login",
//               element: <Login />,
//             },
//           ],
//         },
        
  
//         {
//           element: <AuthGuard roles={["User"]} />,
//           children: [
//             {
//               path:'/user-home',
//               element: <AddPlayerForm/>
//             },
//             {
//               path:'/allchildren',
//               element: <PlayersList/>
//             }
//           ]
//         },

  
//         // {
//         //   path: "*",
//         //   element: <Appi />,
//         // },
//       ],
//     },
//   ]);
  