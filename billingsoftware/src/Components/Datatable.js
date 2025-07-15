import React from 'react';
import EditIconMUI from '@mui/icons-material/Edit';
import DeleteIconMUI from '@mui/icons-material/Delete';
import SaveIconMUI from '@mui/icons-material/Save';
import CancelIconMUI from '@mui/icons-material/Cancel';

const DataTable = ({
  data,
  columns,
  editingId,
  editedData,
  onEditedDataChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  idKey = 'id' // Key to identify unique rows
}) => {
const EditIcon = ({ className = 'w-5 h-5' }) => <EditIconMUI className={className} />;
const DeleteIcon = ({ className = 'w-5 h-5' }) => <DeleteIconMUI className={className} />;
const SaveIcon = ({ className = 'w-5 h-5' }) => <SaveIconMUI className={className} />;
const CancelIcon = ({ className = 'w-5 h-5' }) => <CancelIconMUI className={className} />;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-indigo-500 text-white">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map(row => (
            <tr key={row[idKey]}>
              {editingId === row[idKey] ? (
                // Render inputs for editing mode
                <>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.editable ? (
                        col.type === 'select' ? (
                          <select
                            name={col.key}
                            value={editedData[col.key] || ''}
                            onChange={onEditedDataChange}
                            className="w-full p-2 border border-gray-200 rounded-md"
                          >
                            {col.options.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={col.type || 'text'}
                            name={col.key}
                            value={editedData[col.key] || ''}
                            onChange={onEditedDataChange}
                            className="w-full p-2 border border-gray-200 rounded-md"
                            min={col.min}
                            step={col.step}
                          />
                        )
                      ) : (
                        // Display non-editable fields as text
                        col.render ? col.render(row[col.key], row) : row[col.key]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => onSaveEdit(row[idKey])}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110"
                      title="Save Changes"
                    >
                      <SaveIcon />
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110"
                      title="Cancel Editing"
                    >
                      <CancelIcon />
                    </button>
                  </td>
                </>
              ) : (
                // Render display mode
                <>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => onStartEdit(row)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110"
                      title="Edit"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => onDelete(row[idKey])}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110"
                      title="Delete"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No records found.</p>
      )}
    </div>
  );
};

export default DataTable;