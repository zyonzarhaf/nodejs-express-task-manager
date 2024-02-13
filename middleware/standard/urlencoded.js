import express from 'express';

const useUrlencoded = app => {
    app.use(express.urlencoded({ extended: true }));
};

export default useUrlencoded;
