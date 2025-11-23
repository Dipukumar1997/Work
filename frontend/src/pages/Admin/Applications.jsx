const Applications = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Applications</h1>
      <p style={styles.subtitle}>View and respond to student applications</p>
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>✉️</div>
        <p>No applications yet</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 40,
    background: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  empty: {
    textAlign: 'center',
    padding: 60,
    background: '#fff',
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
};

export default Applications;
