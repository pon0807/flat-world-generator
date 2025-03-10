// js/generate.js

// 提供されたBase64エンコードされたlevel.datテンプレート
const baseLevelDatBase64 = "CgAAAGYLAAAKAAAIDQBCaW9tZU92ZXJyaWRlAAABEgBDZW50ZXJNYXBzVG9PcmlnaW4AAR4AQ29uZmlybWVkUGxhdGZvcm1Mb2NrZWRDb250ZW50AAMKAERpZmZpY3VsdHkCAAAACA8ARmxhdFdvcmxkTGF5ZXJz+gB7ImJpb21lX2lkIjoxLCJibG9ja19sYXllcnMiOlt7ImJsb2NrX25hbWUiOiJtaW5lY3JhZnQ6YmVkcm9jayIsImNvdW50IjoxfSx7ImJsb2NrX25hbWUiOiJtaW5lY3JhZnQ6ZGlydCIsImNvdW50IjoyfSx7ImJsb2NrX25hbWUiOiJtaW5lY3JhZnQ6Z3Jhc3NfYmxvY2siLCJjb3VudCI6MX1dLCJlbmNvZGluZ192ZXJzaW9uIjo2LCJzdHJ1Y3R1cmVfb3B0aW9ucyI6bnVsbCwid29ybGRfdmVyc2lvbiI6InZlcnNpb24ucG9zdF8xXzE4In0KAQ0ARm9yY2VHYW1lVHlwZQADCABHYW1lVHlwZQEAAAADCQBHZW5lcmF0b3ICAAAAARwASGFzVW5jb21wbGV0ZVdvcmxkRmlsZU9uRGlzawAIEABJbnZlbnRvcnlWZXJzaW9uBwAxLjIxLjYyAQoASXNIYXJkY29yZQABDABMQU5Ccm9hZGNhc3QBARIATEFOQnJvYWRjYXN0SW50ZW50AQQKAExhc3RQbGF5ZWSsdsZnAAAAAAgJAExldmVsTmFtZQwA44Oe44Kk5LiW55WMAxMATGltaXRlZFdvcmxkT3JpZ2luWAAAAAADEwBMaW1pdGVkV29ybGRPcmlnaW5Z/38AAAMTAExpbWl0ZWRXb3JsZE9yaWdpbloAAAAACR4ATWluaW11bUNvbXBhdGlibGVDbGllbnRWZXJzaW9uAwUAAAABAAAAFQAAADwAAAAAAAAAAAAAAAEPAE11bHRpcGxheWVyR2FtZQEBFQBNdWx0aXBsYXllckdhbWVJbnRlbnQBAwsATmV0aGVyU2NhbGUIAAAAAw4ATmV0d29ya1ZlcnNpb24IAwAAAwgAUGxhdGZvcm0CAAAAAxcAUGxhdGZvcm1Ccm9hZGNhc3RJbnRlbnQCAAAAAQ0AUGxheWVySGFzRGllZAAECgBSYW5kb21TZWVkQPHtffHMGJkBEABTcGF3blYxVmlsbGFnZXJzAAMGAFNwYXduWAAAAAADBgBTcGF3bln/fwAAAwYAU3Bhd25aAAAAAAMOAFN0b3JhZ2VWZXJzaW9uCgAAAAQEAFRpbWVBAAAAAAAAAAMMAFdvcmxkVmVyc2lvbgEAAAADEgBYQkxCcm9hZGNhc3RJbnRlbnQCAAAACgkAYWJpbGl0aWVzAQoAYXR0YWNrbW9icwEBDQBhdHRhY2twbGF5ZXJzAQEFAGJ1aWxkAQEQAGRvb3JzYW5kc3dpdGNoZXMBBQgAZmx5U3BlZWTNzEw9AQYAZmx5aW5nAAEKAGluc3RhYnVpbGQAAQwAaW52dWxuZXJhYmxlAAEJAGxpZ2h0bmluZwABBgBtYXlmbHkAAQQAbWluZQEBAgBvcAABDgBvcGVuY29udGFpbmVycwEBCAB0ZWxlcG9ydAAFEAB2ZXJ0aWNhbEZseVNwZWVkAACAPwUJAHdhbGtTcGVlZM3MzD0ACA8AYmFzZUdhbWVWZXJzaW9uAQAqAREAYm9udXNDaGVzdEVuYWJsZWQAAREAYm9udXNDaGVzdFNwYXduZWQAAQ0AY2hlYXRzRW5hYmxlZAEBEgBjb21tYW5kYmxvY2tvdXRwdXQBARQAY29tbWFuZGJsb2Nrc2VuYWJsZWQBAQ8AY29tbWFuZHNFbmFibGVkAQQLAGN1cnJlbnRUaWNrQQAAAAAAAAADDQBkYXlsaWdodEN5Y2xlAAAAAAEPAGRvZGF5bGlnaHRjeWNsZQEBDQBkb2VudGl0eWRyb3BzAQEKAGRvZmlyZXRpY2sBARIAZG9pbW1lZGlhdGVyZXNwYXduAAEKAGRvaW5zb21uaWEBAREAZG9saW1pdGVkY3JhZnRpbmcAAQkAZG9tb2Jsb290AQENAGRvbW9ic3Bhd25pbmcBAQsAZG90aWxlZHJvcHMBAQ4AZG93ZWF0aGVyY3ljbGUBAQ4AZHJvd25pbmdkYW1hZ2UBAw8AZWRpdG9yV29ybGRUeXBlAAAAAAMIAGVkdU9mZmVyAAAAAAEYAGVkdWNhdGlvbkZlYXR1cmVzRW5hYmxlZAAKCwBleHBlcmltZW50cwEVAGV4cGVyaW1lbnRzX2V2ZXJfdXNlZAABHgBzYXZlZF93aXRoX3RvZ2dsZWRfZXhwZXJpbWVudHMAAAEKAGZhbGxkYW1hZ2UBAQoAZmlyZWRhbWFnZQEBDABmcmVlemVkYW1hZ2UBAxQAZnVuY3Rpb25jb21tYW5kbGltaXQQJwAAARcAaGFzQmVlbkxvYWRlZEluQ3JlYXRpdmUBARUAaGFzTG9ja2VkQmVoYXZpb3JQYWNrAAEVAGhhc0xvY2tlZFJlc291cmNlUGFjawABDgBpbW11dGFibGVXb3JsZAABEQBpc0NyZWF0ZWRJbkVkaXRvcgABFABpc0V4cG9ydGVkRnJvbUVkaXRvcgABFABpc0Zyb21Mb2NrZVRlbXBsYXRlAAETAGlzRnJvbVdvcmxkVGVtcGxhdGUAAREAGlzUmFuZG9tU2VlZEFsbG93ZWQAARAAaXNTaW5nbGVVc2VXb3JsZAABGwBpc1dvcmxkVGVtcGxhdGVPcHRpb25Mb2NrZWQAAQ0Aa2VlcGludmVudG9yeQAJFQBsYXN0T3BlbmVkV2l0aFZlcnNpb24DBQAAAAEAAAAVAAAAPgAAAAEAAAAAAAAABQ4AbGlnaHRuaW5nTGV2ZWwAAAAAAw0AbGlnaHRuaW5nVGltZZHyAAADEQBsaW1pdGVkV29ybGREZXB0aBAAAAADEQBsaW1pdGVkV29ybGRXaWR0aBAAAAADFQBtYXhjb21tYW5kY2hhaW5sZW5ndGj//wAAAQsAbW9iZ3JpZWZpbmcBARMAbmF0dXJhbHJlZ2VuZXJhdGlvbgEDEABwZXJtaXNzaW9uc0xldmVsAAAAAAMWAHBsYXllclBlcm1pc3Npb25zTGV2ZWwBAAAAAxkAcGxheWVyc3NsZWVwaW5ncGVyY2VudGFnZWQAAAAIBABwcmlkAAABGQBwcm9qZWN0aWxlc2NhbmJyZWFrYmxvY2tzAQEDAHB2cAEFCQByYWluTGV2ZWwAAAAAAwgAcmFpblRpbWUuzAEAAw8AcmFuZG9tdGlja3NwZWVkAQAAAAENAHJlY2lwZXN1bmxvY2sBAR4AcmVxdWlyZXNDb3BpZWRQYWNrUmVtb3ZhbENoZWNrAAEUAHJlc3Bhd25ibG9ja3NleHBsb2RlAQETAHNlbmRjb21tYW5kZmVlZGJhY2sBAxQAc2VydmVyQ2h1bmtUaWNrUmFuZ2UEAAAAARAAc2hvd2JvcmRlcmVmZmVjdAEBDwBzaG93Y29vcmRpbmF0ZXMAAQ4Ac2hvd2RheXNwbGF5ZWQAAREAc2hvd2RlYXRobWVzc2FnZXMBARIAc2hvd3JlY2lwZW1lc3NhZ2VzAQEIAHNob3d0YWdzAQEJAHNwYXduTW9icwEDCwBzcGF3bnJhZGl1cwoAAAABEwBzdGFydFdpdGhNYXBFbmFibGVkAAEUAHRleHR1cmVQYWNrc1JlcXVpcmVkAAELAHRudGV4cGxvZGVzAQEVAHRudGV4cGxvc2lvbmRyb3BkZWNheQABEwB1c2VNc2FHYW1lcnRhZ3NPbmx5AAQPAHdvcmxkU3RhcnRDb3VudP7///8AAAAACg4Ad29ybGRfcG9saWNpZXMAAA==";

// バイオーム名からIDへのマッピング
const biomeMap = {
    "plains": 1,
    "desert": 2
};

// level.datを生成する関数（worldNameとseedを削除）
function generateLevelDat(biome, layers) {
    // 1. Base64をデコードしてバイナリデータに変換
    const binaryData = atob(baseLevelDatBase64);

    // 2. カスタムデータを構築（FlatWorldLayersのみ）
    const flatWorldLayers = {
        biome_id: biomeMap[biome] || 1, // デフォルトはPlains
        block_layers: [
            { block_name: "minecraft:bedrock", count: 1 }, // 最下層は常にBedrock
            ...layers.map(layer => ({
                block_name: `minecraft:${layer.block}`,
                count: layer.height
            }))
        ],
        encoding_version: 6,
        structure_options: null,
        world_version: "version.post_1_18"
    };
    const flatWorldLayersString = JSON.stringify(flatWorldLayers);

    // 3. テンプレート内のFlatWorldLayersを置換
    let modifiedBinary = binaryData;
    const originalFlatWorldLayers = `{"biome_id":1,"block_layers":[{"block_name":"minecraft:bedrock","count":1},{"block_name":"minecraft:dirt","count":2},{"block_name":"minecraft:grass_block","count":1}],"encoding_version":6,"structure_options":null,"world_version":"version.post_1_18"}`;
    modifiedBinary = modifiedBinary.replace(originalFlatWorldLayers, flatWorldLayersString);

    // 4. バイナリデータをBlobに変換してダウンロード
    const byteArray = new Uint8Array(modifiedBinary.length);
    for (let i = 0; i < modifiedBinary.length; i++) {
        byteArray[i] = modifiedBinary.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'level.dat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// グローバルスコープで関数を利用可能に
window.generateLevelDat = generateLevelDat;