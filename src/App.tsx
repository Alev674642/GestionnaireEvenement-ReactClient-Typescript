import "./App.css"
import NavBar from "./components/NavBar"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListeSorties from "./components/sorties/ListeSorties"
import SortieProvider from "./components/sorties/SortieProvider"
import UniqueSortie from "./components/sorties/UniqueSortie"
import Login from "./components/login/login"
import RequireAuth from "./components/login/RequireAuth"
import AuthProvider from "./components/login/AuthProvider"
import SignIn from "./components/login/SignIn"
import Welcome from "./components/sorties/Welcome"
import FormikSortie from "./components/sorties/FormikSortie"
import VisionneuseEvenements from "./components/sorties/VisionneuseEvenements"

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<AuthProvider>
					<SortieProvider>
						<NavBar></NavBar>
						<Routes>
							<Route path="/" element={<Welcome />}></Route>
							<Route
								path="/login"
								element={<Login />}
							></Route>
							<Route
								path="/signin"
								element={<SignIn />}
							></Route>

							<Route
								path="/sortie/:idsortie"
								element={
									<RequireAuth>
										<UniqueSortie />
									</RequireAuth>
								}
							></Route>
							<Route
								path="/listeSorties"
								element={
									<RequireAuth>
										<ListeSorties />
									</RequireAuth>
								}
							></Route>
							<Route
								path="/formulairesortieFormik"
								element={
									<RequireAuth>
										<FormikSortie />
									</RequireAuth>
								}
							></Route>
							<Route
								path="/formulairesortie/:idsortie"
								element={
									<RequireAuth>
										<FormikSortie />
									</RequireAuth>
								}
							></Route>
							<Route
								path="/visionneuse"
								element={
									<RequireAuth>
										<VisionneuseEvenements />
									</RequireAuth>
								}
							></Route>
						</Routes>
					</SortieProvider>
				</AuthProvider>
			</div>
		</BrowserRouter>
	)
}

export default App
