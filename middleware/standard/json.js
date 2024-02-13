import express from 'express';

const useJson = app => {
    app.use(express.json());
};

export default useJson;
