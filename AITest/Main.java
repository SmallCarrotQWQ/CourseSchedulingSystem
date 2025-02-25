package AITest;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) {
        String apiUrl = "https://api.coze.cn/v3/chat";
        String token = "pat_fAEAvwOm0ZJaC294hNRzcU59C51E0SVwvpcFpXYUqb01ukqYLJkMHyfLuuLDIKcs"; // 访问令牌
        String botId = "7473104170443325480"; // Bot ID
        String userId = "SmallCarrot"; // 用户 ID

        // 用户输入的问题
        String userInput = "你好，AI！";

        String jsonData = "{"
                + "\"bot_id\": \"" + botId + "\","
                + "\"user_id\": \"" + userId + "\","
                + "\"stream\": false,"
                + "\"auto_save_history\": true,"
                + "\"additional_messages\": [{"
                + "\"role\": \"user\","
                + "\"content\": \"" + userInput + "\","
                + "\"content_type\": \"text\""
                + "}]"
                + "}";

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Authorization", "Bearer " + token)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Response Code: " + response.statusCode());
            System.out.println("Response Content: " + response.body());

            // 解析响应内容
            String aiResponse = parseAIResponse(response.body());
            System.out.println("AI 回复: " + aiResponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String parseAIResponse(String jsonResponse) {
        return "test";
    }
}