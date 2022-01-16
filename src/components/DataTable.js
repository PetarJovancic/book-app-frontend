import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{ field: 'name', headerName: 'Name', width: 300 },
	{ field: 'books', headerName: 'Books', width: 500 },
];

const DataTable = ({ tableData }) => {
	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				getRowId={data => data._id}
				rows={tableData}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				pagination
			/>
		</div>
	);
};

export default DataTable;
