import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Layout from '../components/layout/Layout';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;