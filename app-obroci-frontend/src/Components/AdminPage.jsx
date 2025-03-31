import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { FaUserCog } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import SacuvajButton from './SacuvajButton';
import NamirniceTable from './NamirniceTable';
import KorisniciTable from './KorisniciTable';
import PreferencijeTable from './PreferencijeTable';





function AdminPage() {
     const [selectedSection, setSelectedSection] = useState("korisnici");
        const menuItems = [
        { id: 1, label: "Upravljaj korisnicima", section: "korisnici", icon: FaUserCog },
        { id: 2, label: "Upravljaj namirnicama", section: "namirnice", icon:  MdFastfood},
        { id: 3, label: "Upravljaj preferencijama", section: "preferencije", icon: HiClipboardDocumentList }
        ];

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "korisnici":
                return <div style={styles.profileCard}>
                <h3 className="text-center">Korisnici</h3>
                <KorisniciTable></KorisniciTable>
            </div>;
            case "namirnice":
                return <div style={styles.profileCard}>
                <h3 className="text-center">Namirnice</h3>
          <NamirniceTable></NamirniceTable>
         </div>;
            case "preferencije":
                return <div style={styles.profileCard}>
                <h3 className="text-center">Preferencije</h3>
                <PreferencijeTable></PreferencijeTable>
         </div>;
            default:
                return null;
        }
    };
  return (
    <div className="container-fluid" style={styles.container}>
            <div className="row">
                {/* Sidebar */}
                <SideBar menuItems={menuItems} setSelectedSection={setSelectedSection} />

                {/* Main content */}
                <div className="col-md-9 p-4" style={styles.mainContent}>
                    <h2 className="text-center mb-4" style={styles.heading}>Admin Panel</h2>
                    {renderSectionContent()}
                </div>
            </div>
            
            
            </div>
  )
}


const styles = {
    container: {
        backgroundColor: "rgba(178, 246, 175, 0.8)",
        minHeight: "100vh",
    },
  
    mainContent: {
        backgroundColor: "#fff",
        borderRadius: "2px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        padding: "30px",
        marginTop: "10px", // Razmak od sidebar-a
        minHeight: "80vh",
    },
    heading: {
        fontSize: "28px",
        color: "#333", // Tamno siva boja za heading
        marginBottom: "20px",
        fontWeight: "600",
    },
    profileCard: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        marginTop: "20px",
    },

}




export default AdminPage
