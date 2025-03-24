import {  createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import Login from "./pages/loginPage";
import { AuthGuard } from "./guards/auth-guard";
import AddPlayerForm from "./pages/parents pages/homePage";
import PlayersList from "./pages/parents pages/allChildrenPage";

export const routes = createBrowserRouter([
  {
    path: "", //localhost:3000
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        // Guard
        element: <AuthGuard roles={[]} />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      

      //Guard for admins
    //   {
    //     element: <AuthGuard roles={["Vendor"]} />,
    //     children: [
    //       {
    //         path: "/vendor-home", 
    //         element: <Home />,
    //       },
    //       {
    //         path: "/reservations", 
    //         element: <MovieReservations />,
    //       },
    //       {
    //         path: "/vendor-movies",
    //         element: <MovieForm />,
    //       },
    //       {
    //         path: "/my-movies", 
    //         element: <MovieCards/>,
    //       },
    //       // {
    //       //   path: "/addVaccineCenter", 
    //       //   element: <AddVaccineCenter />,
    //       // },
    //       // {
    //       //   path:'/updateVaccineCenter/:id',
    //       //   element: <UpdateVaccineCenter/>
    //       // }
    //       // ,
    //       // {
    //       //   path:'/addVaccine',
    //       //   element: <AddVaccine/>
    //       // }
    //       // ,
    //       // {
    //       //   path:'/updateVaccine/:id',
    //       //   element: <UpdateVaccine/>
    //       // },
    //       // {
    //       //   path:'/vaccine',
    //       //   element: <Vaccine/>
    //       // }
    //     ],
    //   },
      {
        element: <AuthGuard roles={["User"]} />,
        children: [
          {
            path:'/user-home',
            element: <AddPlayerForm/>
          },
          {
            path:'/allchildren',
            element: <PlayersList/>
          }
        ]
      },
    //   // {
    //   //   element: <AuthGuard roles={["Vaccination Center"]} />,
    //   //   children: [
    //   //     {
    //   //       path:'/vaccination-center-home',
    //   //       element: <VaccineCenterPage/>
    //   //     }
    //   //   ]
    //   // },


    // //   {
    // //     element: <AuthGuard roles={["Admin"]} />,
    // //     children: [
    // //       {
    // //         path: "/admin-home", // home page
    // //         element: <AdminHome />,
    // //       },
    // //       {
    // //         path: "/show-user/:id",
    // //         element: <ShowUser />,
    // //       },
    // //       {
    // //         path: "/update-user",
    // //         element: <UpdateUser />,
    // //       },
    // //     ],
    // //   },

    //   // Guard for professor
    // //   {
    // //     element: <AuthGuard roles={["Professor"]} />,
    // //     children: [
    // //       {
    // //         path: "/professor-home",
    // //         element: <ProfessorHome />,
    // //       },
    // //     ],
    // //   },

      // {
      //   path: "*",
      //   element: <Appi />,
      // },
    ],
  },
]);
