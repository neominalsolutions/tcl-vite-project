import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	TextField,
} from '@mui/material';

function LoginDialog({
	open, // dialog göster yada gizle
	handleClose, // dialoıg kapatmak için
}: {
	open: boolean;
	handleClose(): void;
}) {
	const onFormSubmit = () => {
		console.log('form Submit');
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{'Login Formu'}</DialogTitle>
			<DialogContent>
				<Box component="form" autoComplete="off">
					<TextField
						sx={{ minWidth: '100%' }}
						id="filled-textarea"
						label="Please type email"
						placeholder="Email"
						multiline
						variant="filled"
						helperText="Hata 1"
					/>
					<Divider />
					<TextField
						sx={{ minWidth: '100%' }}
						id="filled-textarea"
						label="Please type password"
						placeholder="Password"
						multiline
						variant="filled"
						helperText="Hata 2"
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onFormSubmit} autoFocus>
					Oturum Aç
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LoginDialog;
