import React, { useState, useEffect } from "react";
import axios from "axios";
import AddThemeForm from "./AddThemeForm"; // Import the AddThemeForm component

const AdminPage = () => {
  const [themes, setThemes] = useState([]);
  const [message, setMessage] = useState("");
  const [editingTheme, setEditingTheme] = useState(null);
  const [themeIdToDelete, setThemeIdToDelete] = useState("");

  // Fetch themes
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/themes");
        setThemes(response.data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };
    fetchThemes();
  }, []);

  // Delete theme by ID
  const handleDeleteById = async () => {
    if (!themeIdToDelete) {
      alert("Please enter a valid Theme ID.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete theme with ID: ${themeIdToDelete}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/themes/${themeIdToDelete}`);
        setThemes((prevThemes) => prevThemes.filter((theme) => theme.id !== parseInt(themeIdToDelete)));
        setMessage(`Theme with ID: ${themeIdToDelete} deleted successfully.`);
        setThemeIdToDelete("");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting theme:", error);
        setMessage("Failed to delete theme. Please check the ID and try again.");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  // Edit theme
  const handleEdit = async (id, updatedTheme) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/edit-theme/${id}`,
        updatedTheme,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === id ? { ...theme, ...response.data } : theme
        )
      );
      setMessage("Theme updated successfully!");
      setEditingTheme(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating theme:", error);
      setMessage("Failed to update theme. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Page: Manage Themes</h1>
      {message && <p style={styles.message}>{message}</p>}

      <AddThemeForm setMessage={setMessage} />

      <div style={styles.deleteSection}>
        <h2 style={styles.subHeader}>Delete Theme by ID</h2>
        <div style={styles.deleteContainer}>
          <input
            type="text"
            placeholder="Enter Theme ID"
            value={themeIdToDelete}
            onChange={(e) => setThemeIdToDelete(e.target.value)}
            style={styles.inputField}
          />
          <button
            onClick={handleDeleteById}
            style={styles.deleteButton}
          >
            Delete by ID
          </button>
        </div>
      </div>

      <h2 style={styles.subHeader}>All Themes</h2>
      <div style={styles.themeGallery}>
        {themes.map((theme) => (
          <div key={theme.id} style={styles.themeCard}>
            {editingTheme === theme.id ? (
              <EditThemeForm
                theme={theme}
                onSave={(updatedTheme) => handleEdit(theme.id, updatedTheme)}
                onCancel={() => setEditingTheme(null)}
              />
            ) : (
              <>
                <h3 style={styles.themeTitle}>{theme.name}</h3>
                <img
                  src={theme.imageUrl}
                  alt={theme.name}
                  style={styles.themeImage}
                />
                <button
                  style={styles.editButton}
                  onClick={() => setEditingTheme(theme.id)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// EditThemeForm Component
const EditThemeForm = ({ theme, onSave, onCancel }) => {
  const [name, setName] = useState(theme.name);
  const [imageUrl, setImageUrl] = useState(theme.imageUrl);

  const handleSubmit = () => {
    if (!name || !imageUrl) {
      alert("Both fields are required!");
      return;
    }
    onSave({ name, imageUrl });
  };

  return (
    <div style={styles.editForm}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Theme Name"
        style={styles.inputField}
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        style={styles.inputField}
      />
      <div style={styles.formButtons}>
        <button
          onClick={handleSubmit}
          style={styles.saveButton}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          style={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Styles (Updated for better alignment and lighter blue side lines)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#4d94ff',  // Blue background
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: 'auto',
    color: '#fff',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '20px',
    textAlign: 'center',
  },
  message: {
    color: '#28a745',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subHeader: {
    fontSize: '1.8em',
    color: '#f8f9fa',
    marginTop: '40px',
    textAlign: 'center',
  },
  deleteSection: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  deleteContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  inputField: {
    padding: '12px',
    width: '250px',
    borderRadius: '8px',
    border: '1px solid #fff',
    fontSize: '1em',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Lighter background color
    color: '#333',
    textAlign: 'center', // Centered text
    boxSizing: 'border-box', // To ensure the padding doesn't mess up the width
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  themeGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  themeCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '250px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    margin: '10px',
  },
  themeImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  themeTitle: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '10px',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1.1em',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1em',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1em',
  },
  formButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  },
};

export default AdminPage;
