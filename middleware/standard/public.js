import express from 'express';

const usePublic = app => {
    app.use(express.static('public'));
};

export default usePublic;
