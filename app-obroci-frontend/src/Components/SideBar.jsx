import React from 'react'

function SideBar({ menuItems, setSelectedSection }) {

    const styles = {
        container: {
            backgroundColor: "rgba(178, 246, 175, 0.8)",
            minHeight: "100vh",
        },
        sidebar: {
            backgroundColor: "#2d8659", 
            boxShadow: "2px 0px 5px rgba(0,0,0,0.2)",
            //borderRadius: "10px",
            height: "100vh", 
            paddingTop: "30px", 
        },
        sidebarItem: {
            color: "#fff", 
            fontSize: "18px",
            padding: "12px 0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.3s ease", 
        },
        sidebarItemHover: {
            backgroundColor: "#1e6e45", 
            color: "#ffcc00", 
        },
        icon: {
            color: "#fff", 
            fontSize: "20px", 
        },
    };

    return (
    <div className="col-md-3 p-4" style={styles.sidebar}>
    <ul className="list-unstyled">
      {menuItems.map((item) => (
        <li
          key={item.id}
          style={styles.sidebarItem}
          onClick={() => setSelectedSection(item.section)}
        >
          {item.label}
          {item.icon && <item.icon style={styles.icon} />}
        </li>
      ))}
    </ul>
  </div>
  )

}

export default SideBar
