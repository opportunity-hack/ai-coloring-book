import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NewNavbar from "@/components/new-navbar/newnavbar.module";
import Sponsor from "@/components/Sponsor/sponsor.module";
import Header from "@/components/header/header.module";
import Footer from "@/components/footer/footer.module";

const SponsorPage = () => {
	return (
		<>
			<Header />
			<Sponsor />
			<Footer />
		</>
	);
};

export default SponsorPage;
