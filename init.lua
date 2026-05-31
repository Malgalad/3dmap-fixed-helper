listener = {}

local random = math.random

local function generate_uuid()
    local template ='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return string.gsub(template, '[xy]', function (c)
        local v = (c == 'x') and random(0, 0xf) or random(8, 0xb)
        return string.format('%x', v)
    end)
end

math.randomseed(os.time())

local uuid = generate_uuid()

registerForEvent('onInit', function()
  print("3D World Map Fixed Devkit: registered with ID " .. uuid)
end)

registerInput('slug', 'Send current position', function(keypress)
    if keypress then
        SendPosition()
    end
end)


function SendPosition()
	local pos = GetPlayer():GetWorldPosition()
	HttpClient.Get("https://cyberpunk.moonbee.eu/addmarker?id=" .. uuid .. "&pos=" .. pos.x .. "%2B" .. pos.y .. "%2B" .. pos.z)
end
