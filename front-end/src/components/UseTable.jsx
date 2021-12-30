import {
	Table,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
	table: {
		marginTop: theme.spacing(3),
		"& thead th": {
			fontWeight: "600",
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary.light,
		},
		"& tbody td": {
			fontWeight: "300",
		},
		"& tbody tr:hover": {
			backgroundColor: theme.palette.action.hover,
			cursor: "pointer",
		},
	},
}));

export default function UseTable(rows) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const classes = useStyles();

	const TblContainer = (props) => (
		<Table className={classes.table}>{props.children}</Table>
	);

	const TblHead = () => (
		<TableHead>
			<TableRow>
				<TableCell>Avatar</TableCell>
				<TableCell align="center">Username</TableCell>
				<TableCell align="center">Email</TableCell>
				<TableCell align="center">Password</TableCell>
				<TableCell align="center">Total Orders</TableCell>
				<TableCell align="center">Created At</TableCell>
				<TableCell align="center">Actions</TableCell>
			</TableRow>
		</TableHead>
	);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const recordsAfterPaging = () => {
		return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	};

	const TblPagination = () => (
		<TablePagination
			rowsPerPageOptions={[5, 10, 25]}
			component="div"
			count={rows.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);

	return {
		TblHead,
		TblPagination,
		TblContainer,
		recordsAfterPaging,
	};
}
