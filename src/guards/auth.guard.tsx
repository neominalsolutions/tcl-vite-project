import { useSelector } from 'react-redux';
import type { RootState } from '../contexts/store';
import { Navigate } from 'react-router';

// <AuthGuard> -> {children}:{ children: React.ReactNode }
//   <UsersCompoent>
// </AuthGurd>
//

// <D />

function AuthGuard({ children }: { children: React.ReactNode }) {
	// session State kontrolü

	const sessionState = useSelector(
		(rootState: RootState) => rootState.userSessionState
	);

	if (sessionState.authenticated) {
		return <>{children}</>; // children ise kontrol sonrası redirect edilen aslında page component
	}

	return <Navigate to={'/unauthorize'}></Navigate>;
}

export default AuthGuard;
