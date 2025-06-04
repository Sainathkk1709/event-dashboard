import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Layout from '../components/layout/Layout';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;