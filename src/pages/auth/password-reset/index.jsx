import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useRouter } from "next/router";


const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [url,setUrl]  = useState("");

	const SuccessBox = ({msg}) => {
		return (
		<div className="h-screen items-center flex flex-col justify-center w-full">
		  <main className="flex flex-col items-center w-full justify-center flex-1 sm:px-20 text-center">
			<div className="bg-green-400 p-12 flex justify-center items-center flex-col shadow-xl rounded-lg w-2/5">
			  <h1 className="text-white text-2xl underline font-bold">
				{msg}
			  </h1>
			  <p className="text-white text-lg">
				Please Press the Login button for you verification!
			  </p>
			  <button onClick={()=>router.push('/auth/login')} className="m-2 text-white text-xl bg-cyan-800 rounded-md py-2 px-8">Login</button>
			</div>
		  </main>
		  </div>
		);
	  };

	useEffect(() => {
		const verifyUrl = async () => {

			try {
				const {userId,token} = router.query;
				console.log(userId, token);
				if (userId == undefined || token == undefined) {
				return;
				}
				const urllink = `https://kg-server-production.up.railway.app/api/password-reset/${userId}/${token}`;
				setUrl(urllink);
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
				setLoading(false)
			}
		}
	};

	return (

		<>
		{msg===""?
		<Fragment>
			{validUrl ? (
				
				<div className={"forgotContainer"}>
					{!loading?
					<form className={"form_forgotContainer"} onSubmit={handleSubmit}>
						<h1>Add New Password</h1>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={"input"}
						/>
						{error && <div className={"error_msg"}>{error}</div>}
						<button disabled={loading} type="submit" className={"bg-cyan-900 text-white font-bold px-12 py-2 rounded-lg hover:bg-cyan-800"}>
							Reset Password
						</button>
					</form>:   <ClimbingBoxLoader color="#0d66a1" size="30"  />}
				</div>
			) : (
				<div className="h-screen w-full items-center flex justify-center">
				<h1 className="text-red-400 text-5xl font-bold items-center p-10 rounded-lg shadow-2xl">404 Not Found</h1>
				
				</div>
			)}
		</Fragment>:<SuccessBox msg={msg}/>}
		</>
	);
};

export default PasswordReset;
