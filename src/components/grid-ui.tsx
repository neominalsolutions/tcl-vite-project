// güncel size değerini dışırı iletmek için fırlatır.
// pageSize initial pageSize değeri default 10
// {pageSize,onPageSize}: {pageSize: number; onPageSize: (size: number) => void; }

function GridUI({
	pageSize, // number
	onPageSize, // func
}: {
	// type
	pageSize: number;
	onPageSize: (size: number) => void;
}) {
	// pageSize değişimi simüle etmek için bir buton ekledik
	const onPageSizeChange = () => {
		const newPageSize = pageSize === 10 ? 20 : 10;
		console.log('GridUI Component New Page Size:', pageSize);
		onPageSize(newPageSize); // dışarıya component pageSize istenen güncel değeri fırlattık.
	};

	const bgColor = pageSize === 10 ? 'lightblue' : 'lightgreen';
	// koşullu bir sitil tanımı
	return (
		<>
			<div style={{ backgroundColor: bgColor }}>GridUI</div>
			<button onClick={onPageSizeChange}>Change Page Size</button>
		</>
	);
}

export default GridUI;
