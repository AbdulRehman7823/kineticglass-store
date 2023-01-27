import { useState } from "react";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const url = `http://localhost:4000/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
			setLoading(false);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
				setLoading(false);
			}
		}
	};

	return (
		<div className={"forgotContainer"}>
          {!loading?
			<form className={"form_forgotContainer"} onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className={"input"}
				/>
				{error && <div className={"error_msg"}>{error}</div>}
				{msg && <div className={"success_msg"}>{msg}</div>}
				<button disabled={loading} type="submit" className={"bg-cyan-900 text-white font-bold px-12 py-2 rounded-lg hover:bg-cyan-800"}>
					Submit
				</button>
			</form>:  <ClimbingBoxLoader color="#0d66a1" size="30"  />}
		</div>
	);
};

export default ForgotPassword;
