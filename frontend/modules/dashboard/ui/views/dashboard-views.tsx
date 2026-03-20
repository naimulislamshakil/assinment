'use client';
import { useMeQuery } from '@/Redux/slice/userSlice';
import React from 'react';

const DashboardViews = () => {
	const { data } = useMeQuery();

	console.log(data);

	return <div>DashboardViews</div>;
};

export default DashboardViews;
