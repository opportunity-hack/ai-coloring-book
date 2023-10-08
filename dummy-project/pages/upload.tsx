import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NewNavbar from "@/components/new-navbar/newnavbar.module";
import Upload from "@/components/upload/upload.module";
import Header from "@/components/header/header.module";
import Footer from "@/components/footer/footer.module";

const UploadPage = () => {
	return (
		<>
			<Header />
      <Upload></Upload>
      <Footer/>
		</>
	);
};

export default UploadPage;
