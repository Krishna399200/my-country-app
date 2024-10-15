import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>There was an error loading the data. Please try again later.</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Country List</h1>
      <div style={styles.cardContainer}>
        {countries.map((country) => (
          <div key={country.name} style={styles.card}>
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              style={styles.flagImage}
            />
            <h3 style={styles.countryName}>{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    width: "150px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  flagImage: {
    width: "100%",
    height: "100px", // Set a uniform height for the images
    objectFit: "cover", // Ensures the image covers the available space
    borderRadius: "4px",
  },
  countryName: {
    marginTop: "10px",
    fontSize: "16px",
  },
};

export default App;
