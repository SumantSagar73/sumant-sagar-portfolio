import React from 'react'

const Loader = ({ message = 'Loading...' }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="loader" aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(0,0,0,0.1)', borderTopColor: 'rgba(0,0,0,0.6)', animation: 'spin 1s linear infinite' }} />
            <div style={{ marginLeft: 12 }}>{message}</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default Loader
