import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { Navigate } from "react-router-dom";
import { createSocialLoginMutation } from "@/lib/react-query/queries";

const SocialLogin = () => {
	const socialLoginMutation = createSocialLoginMutation();

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: (codeResponse: any) => {
			socialLoginMutation.mutate(codeResponse);
		},
		onError: errorResponse => console.log(errorResponse),
	});

	return (
		<>
			<Button variant={"outline"} className="w-full" onClick={() => { googleLogin() }} disabled={socialLoginMutation.isPending}>
				<FcGoogle className="mr-2 h-5 w-5" />
				Continue with Google
				{socialLoginMutation.isSuccess && <Navigate to="/home" />}
			</Button>
		</>
	)
}

export default SocialLogin