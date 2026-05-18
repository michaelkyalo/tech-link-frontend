const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 shadow rounded">
          <h2 className="text-xl font-bold">
            Users
          </h2>

          <p>Manage platform users</p>
        </div>

        <div className="p-4 shadow rounded">
          <h2 className="text-xl font-bold">
            Products
          </h2>

          <p>Manage product listings</p>
        </div>

        <div className="p-4 shadow rounded">
          <h2 className="text-xl font-bold">
            Orders
          </h2>

          <p>Monitor transactions</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;