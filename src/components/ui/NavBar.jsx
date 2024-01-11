import TodoIcon from "../../assets/todoicon.png";
const NavBar = () => {
	return (
		<div className="w-full shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-blue-800">
			{/* Header section with a title for the TODO List App */}
			<div className="flex justify-center items-center">
				<img
					className="h-[100px] w-[130px] m-0"
					src={TodoIcon}
					alt="app logo"
				/>
				<h1 className="font-bold text-[20px] sm:text-[30px] text-white">
					Todo-List
				</h1>
			</div>
		</div>
	);
};

export default NavBar;
