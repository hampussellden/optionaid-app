import React from 'react';
import AuthButton from '../_components/AuthButton';
import { createClient } from '@/utils/supabase/server';

const Dashboard = async() => {

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return(
        <>
          <h1> client dashboard</h1>
          <AuthButton />
        </>
        )
};
        
export default Dashboard;