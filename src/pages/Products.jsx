import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [apiList, setApiList] = useState([]);
  const [newApiUrl, setNewApiUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api')
      .then(res => setApiList(res.data))
      .catch(err => console.error('Gagal ambil data dari MongoDB:', err));
  }, []);

  const handleAdd = () => {
    if (!newApiUrl) return;

    const isGitHub = newApiUrl.includes('githubusercontent.com');
    const fetchUrl = isGitHub
      ? 'https://corsproxy.io/?' + encodeURIComponent(newApiUrl)
      : newApiUrl;

    axios.get(fetchUrl)
      .then(res => {
        const resData = res.data;
        let entries = [];

        // Jika data array (berita)
        if (Array.isArray(resData.data)) {
          entries = resData.data.slice(0, 5).map((item) => ({
            name: item.title || 'Judul tidak tersedia',
            developer: 'Berita Indo API',
            link: item.link,
            status: '✅',
            description: item.description || item.pubDate,
            auth: 'false',
          }));
        } else {
          // Jika object tunggal
          let data = resData;
          if (Array.isArray(resData)) {
            data = resData[0];
          }

          if (!data || typeof data !== 'object') throw new Error('Data tidak valid');

          entries = [{
            name: data.name || data.API || data.surah || 'Custom API',
            developer: data.developer || data.author || 'Unknown',
            link: newApiUrl,
            status: data.HTTPS ? '✅' : '❌',
            description: data.description || data.arti || data.type || JSON.stringify(data).slice(0, 60),
            auth: data.auth || data.Auth || 'false',
          }];
        }

        return Promise.all(entries.map(entry =>
          axios.post('http://localhost:5000/api', entry)
        ));
      })
      .then(responses => {
        const saved = responses.map(res => res.data);
        setApiList(prev => [...saved, ...prev]);
        setNewApiUrl('');
      })
      .catch(err => {
        console.error(err);
        alert('Gagal fetch atau simpan API: ' + err.message);
      });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Daftar API</h2>
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Input API endpoint URL..."
          value={newApiUrl}
          onChange={e => setNewApiUrl(e.target.value)}
          className="border p-2 flex-grow mr-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah API
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Nama API</th>
              <th className="px-4 py-2">Pengembang</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2">Autentikasi</th>
            </tr>
          </thead>
          <tbody>
            {apiList.map((api, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{api.name}</td>
                <td className="px-4 py-2">{api.developer}</td>
                <td className="px-4 py-2">
                  <a href={api.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    Link
                  </a>
                </td>
                <td className="px-4 py-2">{api.status}</td>
                <td className="px-4 py-2">{api.description}</td>
                <td className="px-4 py-2 font-mono">{api.auth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
