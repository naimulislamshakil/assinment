'use client';
import { useMeQuery } from '@/Redux/slice/userSlice';
import React from 'react';

const DashboardViews = () => {
	const { data } = useMeQuery();

	console.log(data);

	return <div className="w-full">DashboardViews</div>;
};

export default DashboardViews;
