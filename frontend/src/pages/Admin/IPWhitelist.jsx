import { useState, useEffect } from 'react';
import axios from 'axios';

const IPWhitelist = () => {
  const [ips, setIps] = useState([]);
  const [newIP, setNewIP] = useState({ ipAddress: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIPs();
  }, []);

  const fetchIPs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/ip-whitelist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIps(response.data.ips);
    } catch (error) {
      console.error('Error fetching IPs:', error);
    }
  };

  const handleAddIP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/ip-whitelist/add', newIP, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ IP added to whitelist');
      setNewIP({ ipAddress: '', description: '' });
      fetchIPs();
    } catch (error) {
      alert('❌ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveIP = async (id) => {
    if (!confirm('Remove this IP from whitelist?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/ip-whitelist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ IP removed');
      fetchIPs();
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/ip-whitelist/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchIPs();
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>IP Whitelist Management</h1>
      <p style={styles.subtitle}>Control which IP addresses can access admin registration</p>

      {/* Add IP Form */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Add New IP Address</h2>
        <form onSubmit={handleAddIP} style={styles.form}>
          <input
            type="text"
            placeholder="IP Address (e.g., 192.168.1.100)"
            value={newIP.ipAddress}
            onChange={(e) => setNewIP({ ...newIP, ipAddress: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Description (e.g., Home Office)"
            value={newIP.description}
            onChange={(e) => setNewIP({ ...newIP, description: e.target.value })}
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.addBtn}>
            {loading ? 'Adding...' : '➕ Add IP'}
          </button>
        </form>
      </div>

      {/* IP List */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Whitelisted IP Addresses</h2>
        {ips.length === 0 ? (
          <p style={styles.empty}>No IPs whitelisted yet</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>IP Address</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Added</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ips.map((ip) => (
                <tr key={ip._id}>
                  <td style={styles.td}>{ip.ipAddress}</td>
                  <td style={styles.td}>{ip.description || '-'}</td>
                  <td style={styles.td}>
                    <span style={{...styles.status, background: ip.isActive ? '#4caf50' : '#f44336'}}>
                      {ip.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={styles.td}>{new Date(ip.createdAt).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleToggleStatus(ip._id)} style={styles.toggleBtn}>
                      {ip.isActive ? '🔴 Disable' : '🟢 Enable'}
                    </button>
                    <button onClick={() => handleRemoveIP(ip._id)} style={styles.deleteBtn}>
                      🗑️ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: 20, maxWidth: 1200, margin: '0 auto' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { color: '#666', marginBottom: 30 },
  card: { background: '#fff', padding: 25, borderRadius: 8, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  form: { display: 'flex', gap: 10 },
  input: { flex: 1, padding: 12, border: '1px solid #ddd', borderRadius: 6, fontSize: 14 },
  addBtn: { padding: '12px 24px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: 12, background: '#f5f5f5', textAlign: 'left', fontWeight: 'bold', fontSize: 13 },
  td: { padding: 12, borderBottom: '1px solid #eee', fontSize: 13 },
  status: { padding: '4px 12px', borderRadius: 12, color: '#fff', fontSize: 12, fontWeight: 'bold' },
  toggleBtn: { padding: '6px 12px', background: '#2196f3', color: '#fff', border: 'none', borderRadius: 4, marginRight: 5, cursor: 'pointer', fontSize: 12 },
  deleteBtn: { padding: '6px 12px', background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
  empty: { textAlign: 'center', color: '#999', padding: 40 }
};

export default IPWhitelist;
