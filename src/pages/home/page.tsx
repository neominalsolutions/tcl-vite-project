const promise = new Promise(function (myResolve, myReject) {
	const x = 0;
	console.log('x', x);

	// some code (try to change x to 5)
	setTimeout(() => {
		if (x == 0) {
			myResolve('OK');
		} else {
			myReject('Error');
		}
	}, 1000);
});

// JS default çalışma mantığı senkron kod blokları öncelikli olarak işlenir.
// Daha sonra asenkron promise resolved yada rejected olduğunda JS tarafında kod ile ilgili işlem yapılır.
// JS bu promiseler çözülene kadar kodları bekletmez. bloke etmez. 

function HomePage() {
	const title = 'Home Page';

	const loadData = async () => {
		try {
			const response = await promise;
			console.log('response', response);
		} catch (error) {
			console.log('error', error);
		}
	};

	loadData();
	console.log('title', title);

	return <div>Welcome to the Home Page</div>;
}

export default HomePage;
