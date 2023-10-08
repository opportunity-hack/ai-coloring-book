import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react'
import NewNavbar from "@/components/new-navbar/newnavbar.module";
import Sponsor from "@/components/Sponsor/sponsor.module";
import Header from "@/components/header/header.module";
import Footer from "@/components/footer/footer.module";
import Login from "@/components/login/login.module";
import { postLoginCredentials } from "@/hooks/api";
import Root from "@/components/root/root.module";

const Home = () => {
	return (
		<>
			<Header />
			<Root />
			<Footer />
		</>
	);
};

export default Home;
