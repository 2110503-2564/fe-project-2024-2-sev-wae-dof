"use client"; // ใช้ Client Component เพื่อใช้ useState & useEffect

import { useState, useEffect } from "react";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress, TextField } from "@mui/material";
import { CampgroundJson, CampgroundItem } from "../../../../interfaces";

export default function CampgroundPage() {
    const [search, setSearch] = useState(""); // 🔹 เก็บค่าค้นหา
    const [campgrounds, setCampgrounds] = useState<CampgroundJson | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔹 ใช้ useEffect() แทน useState() เพื่อโหลดข้อมูลครั้งแรก
    useEffect(() => {
        async function fetchData() {
            const data = await getCampgrounds();
            setCampgrounds(data);
            setLoading(false);
        }
        fetchData();
    }, []);
    

    // กรองแคมป์ตามคำค้นหา
    const filteredCampgrounds = campgrounds
        ? {
            count: campgrounds.data.filter((c: CampgroundItem) =>
                c.name.toLowerCase().includes(search.toLowerCase())
            ).length,
            data: campgrounds.data.filter((c: CampgroundItem) =>
                c.name.toLowerCase().includes(search.toLowerCase())
            ),
        }
        : { count: 0, data: [] };

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl font-medium">Campground List</h1>

            {/* 🔹 Search Bar */}
            <TextField
                label="Search Campground"
                variant="outlined"
                fullWidth
                className="my-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            
            {loading ? (
            <p className="text-lg text-gray-600">Loading ... <LinearProgress /></p>
        ) : (
            <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
                <CampgroundCatalog CampgroundJson={filteredCampgrounds} />
            </Suspense>
        )}
        </main>
    );
}
