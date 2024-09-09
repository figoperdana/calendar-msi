import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Typography 
} from '@mui/material';

const MaintenanceProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
      const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID;
      const RANGE = 'Sheet1!A2:G';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Respons jaringan tidak baik');
        }
        const data = await response.json();
        const formattedData = data.values.map(row => ({
          start: row[0],
          end: row[1],
          status: row[2],
          kodeProject: row[3],
          tipeMaintenance: row[4],
          namaProject: row[5],
          linkWrike: row[6]
        }));
        setProjects(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error saat mengambil data proyek:', error);
        setError('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Proyek Pemeliharaan
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mulai</TableCell>
              <TableCell>Selesai</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Kode Proyek</TableCell>
              <TableCell>Tipe Pemeliharaan</TableCell>
              <TableCell>Nama Proyek</TableCell>
              <TableCell>Link Wrike</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.start}</TableCell>
                <TableCell>{project.end}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.kodeProject}</TableCell>
                <TableCell>{project.tipeMaintenance}</TableCell>
                <TableCell>{project.namaProject}</TableCell>
                <TableCell>
                  <a href={project.linkWrike} target="_blank" rel="noopener noreferrer">
                    {project.linkWrike}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MaintenanceProjects;