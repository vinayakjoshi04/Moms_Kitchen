import React from "react";

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const categories = [
  {
    title: "FOOD DELIVERY",
    subtitle: "FROM RESTAURANTS",
    discount: "UPTO 30% OFF",
    bgColor: "#FFE8E0",
    iconColor: "#FF5722"
  },
  {
    title: "GROCERY STORE",
    subtitle: "INSTANT GROCERY",
    discount: "UPTO 25% OFF",
    bgColor: "#E0F7FA",
    iconColor: "#00BCD4"
  },
  {
    title: "DINEOUT",
    subtitle: "EAT OUT & SAVE MORE",
    discount: "UPTO 20% OFF",
    bgColor: "#E8F5E9",
    iconColor: "#4CAF50"
  },
];

const CategorySection = () => {
  // CSS styles defined as JavaScript objects
  const styles = {
    container: {
      backgroundColor: "#f9fafb",
      padding: "4rem 1.5rem",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      color: "#111827",
    },
    headerDesc: {
      color: "#6b7280",
      maxWidth: "36rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      margin: "0 auto",
      maxWidth: "1200px",
      flexWrap: "wrap",
    },
    card: {
      background: "white",
      height: "16rem",
      width: "20rem",
      padding: "1.5rem",
      borderRadius: "1.5rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
    },
    cardContent: {
      textAlign: "center",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      color: "#111827",
    },
    cardSubtitle: {
      fontSize: "1.125rem",
      color: "#6b7280",
    },
    discount: {
      display: "inline-block",
      background: "white",
      color: "#111827",
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "0.5rem 1rem",
      marginBottom: "1rem",
      borderRadius: "9999px",
    },
    arrowIcon: {
      alignSelf: "flex-end",
      width: "3rem",
      height: "3rem",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      transition: "all 0.3s ease",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Our Services</h2>
        <p style={styles.headerDesc}>Choose from our wide range of services and enjoy exclusive discounts and offers</p>
      </div>
      
      <div style={styles.cardContainer}>
        {categories.map((category, index) => (
          <div 
            key={index}
            style={{
              ...styles.card,
              backgroundColor: category.bgColor,
              transform: "scale(1)",
              ":hover": {
                transform: "scale(1.05)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
            }}
          >
            <div style={styles.cardContent}>
              <span style={{...styles.discount, backgroundColor: "white"}}>
                {category.discount}
              </span>
              <h2 style={styles.cardTitle}>{category.title}</h2>
              <p style={styles.cardSubtitle}>{category.subtitle}</p>
            </div>
            
            <div 
              style={{...styles.arrowIcon, backgroundColor: category.iconColor}}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <ArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;