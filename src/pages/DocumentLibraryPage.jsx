import React, { useState } from 'react';
import './DocumentLibraryPage.css';

const DocumentLibraryPage = () => {
    const [activeFolder, setActiveFolder] = useState('Rules & Regulations');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

    // Mock data for folders and documents
    const folders = ['Rules & Regulations', 'Meeting Minutes', 'Financials', 'Forms & Requests'];
    const documents = {
        'Rules & Regulations': [
            { id: 1, name: 'Building Bylaws (Official)', type: 'PDF', size: '1.2 MB', modified: 'Jan 15, 2025' }
        ],
        'Meeting Minutes': [
            { id: 2, name: 'AGM Minutes - 2024', type: 'PDF', size: '850 KB', modified: 'Dec 5, 2024' }
        ],
        'Financials': [],
        'Forms & Requests': [],
    };

    const currentDocuments = documents[activeFolder] || [];

    return (
        <div className="page-wrapper">
            <header className="page-header">
                <h1>Document Library</h1>
                <button className="upload-btn" onClick={() => setIsUploadModalOpen(true)}>
                    <span>+ Upload Document</span>
                </button>
            </header>

            <div className="library-container">
                <div className="folders-panel">
                    <ul className="folder-list">
                        {folders.map(folder => (
                            <li key={folder} className={`folder-item ${activeFolder === folder ? 'active' : ''}`}>
                                <a onClick={() => setActiveFolder(folder)}>{folder}</a>
                            </li>
                        ))}
                    </ul>
                    <button className="create-folder-btn" onClick={() => setIsCreateFolderModalOpen(true)}>+ Create Folder</button>
                </div>

                <div className="documents-panel">
                    <div className="search-bar">
                        <span className="search-icon">{/* SVG Icon */}</span>
                        <input type="text" className="search-input" placeholder={`Search in ${activeFolder}...`} />
                    </div>
                    <div className="document-list">
                        <table className="doc-table">
                            <thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Last Modified</th></tr></thead>
                            <tbody>
                                {currentDocuments.map(doc => (
                                    <tr key={doc.id}>
                                        <td>{doc.name}</td>
                                        <td><span className={`file-icon ${doc.type.toLowerCase()}`}>{doc.type}</span></td>
                                        <td>{doc.size}</td>
                                        <td>{doc.modified}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content">
                        <div className="modal-header"><h2>Upload Document</h2><button className="close-modal-btn" onClick={() => setIsUploadModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Folder</label><select className="select" defaultValue={activeFolder}><option>{activeFolder}</option></select></div>
                            <div className="form-group"><label>File</label><div className="file-drop-area"><p>Drag & Drop files here</p></div></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Folder Modal */}
            {isCreateFolderModalOpen && (
                <div className="modal-overlay open">
                    <div className="modal-content" style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>Create New Folder</h2><button className="close-modal-btn" onClick={() => setIsCreateFolderModalOpen(false)}>&times;</button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Folder Name</label><input type="text" className="input" placeholder="e.g., Insurance Documents" /></div>
                            <button className="upload-btn" style={{ width: '100%' }}>Create Folder</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentLibraryPage;