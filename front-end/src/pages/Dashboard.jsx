import React, { useState, useEffect } from "react";
import {
	Avatar,
	Button,
	Paper,
	TableBody,
	TableCell,
	TableRow,
	Typography,
	IconButton,
	Box,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { d_rows } from "../Data/dummy_rows";
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import UseTable from "../components/UseTable";
import LogoutIcon from "@mui/icons-material/Logout";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

import {
	ActionButton,
	ConfirmCreate,
	ConfirmDelete,
} from "../components/controls";

import { Link as RouterLink } from "react-router-dom";

import AuthService from "../services/auth.service";
import userService from "../services/user.service";
import AdminService from "../services/admin.service";

const getDateTime = (timestamp) => {
	const date = new Date(timestamp);
	const dateTime =
		date.getDate() +
		"/" +
		date.getMonth() +
		"/" +
		date.getFullYear() +
		" " +
		date.getHours() +
		":" +
		date.getMinutes().toString().padStart(2, "0");
	return dateTime;
};

export default function Dashboard() {
	const [rows, setRows] = useState(d_rows);
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);
	const [adminName, setAdminName] = useState("");
	const { TblHead, TblPagination, TblContainer, recordsAfterPaging } =
		UseTable(rows);

	const [openE, setOpenE] = useState(false);
	const [isCreated, setIsCreated] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenE(true);
	};

	const getAdminName = () => {
		const token = Cookies.get("token");
		const decoded = jwt_decode(token);
		const id = decoded.id;
		AdminService.getAdminById(id).then((res) => {
			setAdminName(res.admin_name);
		});
	};

	const getRows = async () => {
		const rows = await userService.getAll();
		setRows(rows);
	};

	const deleteRow = async (id) => {
		await userService.deleteById(id);
		getRows();
		setIsDeleted(true);
	};

	const updateRow = async (id, data) => {
		await userService.update(id, data);
		getRows();
	};

	const createRow = async (data) => {
		await userService.create(data);
		getRows();
	};

	const logout = async () => {
		await AuthService.logout();
	};

	useEffect(() => {
		getAdminName();
		getRows();
	}, []);

	return (
		<div>
			<Paper
				style={{
					marginBottom: 20,
					padding: 12,
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h6">FinStreet Dashboard</Typography>

				<IconButton
					color="primary"
					component="span"
					component={RouterLink}
					to="/"
					onClick={logout}
				>
					<LogoutIcon />
				</IconButton>
			</Paper>
			<Box
				style={{
					marginBottom: 20,
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
					paddingLeft: 12,
					paddingRight: 12,
				}}
			>
				<Typography
					variant="h5"
					style={{
						fontWeight: "bold",
						color: "#3f51b5",
					}}
				>
					Welcome,{" "}
					{adminName != "" &&
						adminName.charAt(0).toUpperCase() + adminName.slice(1)}
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						setOpenPopup(true);
					}}
				>
					Create
				</Button>
			</Box>
			<Paper>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPaging().map((row, index) => {
							return (
								<TableRow key={index}>
									<TableCell component="th" scope="row" align="center">
										<Avatar alt="img" src={row.user_image} />
									</TableCell>
									<TableCell align="center">{row.user_name}</TableCell>
									<TableCell align="center">{row.user_email}</TableCell>
									<TableCell align="center">{row.user_password}</TableCell>
									<TableCell align="center">{row.total_orders}</TableCell>
									<TableCell align="center">
										{getDateTime(row.createdAt)}
									</TableCell>
									<TableCell align="center">
										<ActionButton
											color="primary"
											onClick={() => {
												openInPopup(row);
											}}
										>
											<EditOutlinedIcon fontSize="small" />
										</ActionButton>

										<ActionButton
											color="secondary"
											onClick={() => {
												deleteRow(row.id);
											}}
										>
											<DeleteForeverRoundedIcon fontSize="small" />
										</ActionButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</TblContainer>
			</Paper>
			<TblPagination />

			{/* all popup */}
			<CreateModal
				open={openPopup}
				handleClose={() => setOpenPopup(false)}
				createRow={createRow}
				setIsCreated={setIsCreated}
			/>
			{recordForEdit != null && (
				<EditModal
					openE={openE}
					handleCloseE={() => setOpenE(false)}
					updateRow={updateRow}
					row={recordForEdit}
				/>
			)}
			<ConfirmCreate isCreated={isCreated} setIsCreated={setIsCreated} />
			<ConfirmDelete isDeleted={isDeleted} setIsDeleted={setIsDeleted} />
		</div>
	);
}
