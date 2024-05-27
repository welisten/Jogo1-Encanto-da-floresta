// Aqui serão colocadas as variaveis que asmazenarm as chaves identificadoras
//  necessárias à Classe Phaser.Tileset usadas no Jogo


const mapMain_key = "mapMain_key"
const mapMain_URL = "public/assets/map/mapaMain.json"

const mapL1_key = 'mapLv1_key'
const mapL1_URL = "public/assets/map/fase_1_map.json"

const objectsLayers_keys = { // GENERAL
    WallLayerKey: "walls", //Levels
    MapaMainLayer_obj1: "obj1", // MapaMain
}

const mapMain_tilesetObjConfig = [ // MapaMain

    {
        key: 'comple1',
        url: 'public/assets/tilesets/comple1.png',
        name: 'comple1'
    },
    {
        key: 'comple2',
        url: 'public/assets/tilesets/comple2.png',
        name: 'comple2'
    },
    {
        key: 'comple3',
        url: 'public/assets/tilesets/comple3.png',
        name: 'comple3'
    },
    {
        key: 'set1_1',
        url: 'public/assets/tilesets/set1_1.png',
        name: 'set1_1'
    },
    {
        key: 'set1_2',
        url: 'public/assets/tilesets/set1_2.png',
        name: 'set1_2'
    },
    {
        key:'set2',
        url: 'public/assets/tilesets/set2.png',
        name: 'set2'
    },
    {
        key: 'set3',
        url: 'public/assets/tilesets/set3.png',
        name: 'set3'
    },
    {
        key: 'set4',
        url: 'public/assets/tilesets/set4.png',
        name: 'set4'
    },
    {
        key: 'trees',
        url: 'public/assets/tilesets/trees.png',
        name: 'trees'
    },
]

 const l1_tilesetObjConfig = [
    {
        key: 'comple1',
        url: 'public/assets/tilesets/comple1.png',
        name: 'comple1'
    },
    {
        key: 'comple3',
        url: 'public/assets/tilesets/comple3.png',
        name: 'comple3'
    },
    {
        key: 'set1_1',
        url: 'public/assets/tilesets/set1_1.png',
        name: 'set1_1'
    },
    {
        key: 'set1_2',
        url: 'public/assets/tilesets/set1_2.png',
        name: 'set1_2'
    },
    {
        key:'set2',
        url: 'public/assets/tilesets/set2.png',
        name: 'set2'
    },
    {
        key:'set4',
        url: 'public/assets/tilesets/set4.png',
        name: 'set4'
    },
    {
        key: 'trees',
        url: 'public/assets/tilesets/trees.png',
        name: 'trees'
    }
]

const mapMainLayers_ID = {
    layer1: 'ground',
    layer2: 'levels',
    layer3: 'trunks_roots',
    layer4: 'train',
    layer5: 'floor1',
    layer6: 'fence',
    layer7: 'vegetation_f1',
    layer8: 'floor2',
    layer9: 'tree_tops_1',
    layer10: 'shadows_f2',
    layer11: 'vegetation_f2',
    layer12: 'building_f2'
}

const l1_layers_ID = {
    layer1: 'ground',
    layer2: 'terrain',
    layer3: 'train',
    layer4: 'veg',
    layer5: 'greatTrees_1',
    layer6: 'greatTrees_2',
}


export {
    mapL1_key, //OK
    mapL1_URL, // ok
    mapMain_key,
    mapMain_URL,

    mapMainLayers_ID,
    objectsLayers_keys,
    l1_layers_ID,
    mapMain_tilesetObjConfig,
    l1_tilesetObjConfig, // OK
}